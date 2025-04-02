
"use client";

import { useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BusinessFormation, NewBusinessFormation } from '@/types/llc';


const formSchema = z.object({
  entityName: z.string().min(1, { message: "Entity name is required" }),
  entityAddress: z.string().min(1, { message: "Entity address is required" }),
  serviceProductOffered: z.string().min(1, { message: "Service/product offered is required" }),
  entityType: z.enum(['LLC', 'S-CORP', 'C-CORP'] as const),
  expedite: z.enum(['YES', 'NO'] as const),
  owners: z.array(
    z.object({
      fullName: z.string().min(1, { message: "Full name is required" }),
      address: z.string().min(1, { message: "Address is required" }),
      phone: z.string().min(10, { message: "Valid phone number is required" }),
      email: z.string().email({ message: "Valid email is required" }),
      ssn: z.string().min(9, { message: "Valid SSN is required" }).optional(),
      dob: z.string().min(1, { message: "Date of birth is required" }).optional(),
      responsibleParty: z.boolean().default(false),
      ownerNumber: z.number().min(1),
    })
  ).min(1, { message: "At least one owner is required" }),
  signatures: z.array(
    z.object({
      signHere: z.string().min(1, { message: "Signature is required" }),
      date: z.string().min(1, { message: "Date is required" }),
      signerNumber: z.number().min(1),
    })
  ).min(1, { message: "At least one signature is required" }),
});

export default function LlcPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const defaultValues: z.infer<typeof formSchema> = useMemo(() => ({
    entityName: '',
    entityAddress: '',
    serviceProductOffered: '',
    entityType: 'LLC' as const,
    expedite: 'NO',
    owners: [{
      fullName: '',
      address: '',
      phone: '',
      email: '',
      ssn: '',
      dob: '',
      responsibleParty: true,
      ownerNumber: 1,
    }],
    signatures: [{
      signHere: '',
      date: '',
      signerNumber: 1,
    }],
  }), []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onBlur', // Change to onBlur to reduce validation frequency
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {

      // Transform form data to match our schema
      const formationData: NewBusinessFormation = {
        entityName: data.entityName,
        entityAddress: data.entityAddress,
        serviceProductOffered: data.serviceProductOffered,
        entityType: data.entityType,
        expedite: data.expedite,
        owners: data.owners,
        signatures: data.signatures
      };

      const { data: result, error } = await supabase
        .from('business_formations')
        .insert({
          entity_name: formationData.entityName,
          entity_address: formationData.entityAddress,
          service_product_offered: formationData.serviceProductOffered,
          entity_type: formationData.entityType,
          expedite: formationData.expedite,
          owners: formationData.owners,
          signatures: formationData.signatures,
          user_id: (await supabase.auth.getSession()).data.session?.user.id,
          status: 'pending'
        })
        .select();

      if (error) {
        throw error;
      }

      alert('Business formation submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit business formation. Please try again.');
    }
  };

  const nextStep = async () => {
    // Only validate fields for the current step
    let fieldsToValidate: BusinessFormation[] = [];

    if (step === 1) {
      fieldsToValidate = [
        'entityInformation.entityName',
        'entityInformation.entityAddress',
        'entityInformation.serviceProductOffered',
        'entityInformation.entityType',
        'processingOptions.expedite'
      ];
    } else if (step === 2) {
      fieldsToValidate = [
        'ownerInformation.owner1.fullName',
        'ownerInformation.owner1.address',
        'ownerInformation.owner1.phone',
        'ownerInformation.owner1.email',
        'ownerInformation.owner1.ssn',
        'ownerInformation.owner1.dob'
      ];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Business Formation Application</CardTitle>
          <CardDescription>
            Complete the form below to start your business formation process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* All form fields must be inside this form element */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Entity Information</h2>

                  <FormField
                    control={form.control}
                    name="entityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entity Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter entity name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="entityAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entity Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter entity address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceProductOffered"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service/Product Offered</FormLabel>
                        <FormControl>
                          <Input placeholder="Describe your service or product" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="entityType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Entity Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="LLC" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                LLC
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="S-CORP" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                S-CORP
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="C-CORP" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                C-CORP
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expedite"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Expedite Processing (24HR TURNAROUND)</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value='YES' />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yes (+$100 + 3% processing fee)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value='NO' />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No (Regular processing: 7-10 business days)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Owner Information</h2>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="owner1">
                      <AccordionTrigger>Primary Owner (Responsible Party)</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Enter address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.ssn"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>SSN</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter SSN" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="ownerInformation.owner1.dob"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="owner2">
                      <AccordionTrigger>Additional Owner (Optional)</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner2.fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="ownerInformation.owner2.address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Enter address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="ownerInformation.owner2.phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="ownerInformation.owner2.email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="owner3">
                      <AccordionTrigger>Additional Owner (Optional)</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <FormField
                            control={form.control}
                            name="ownerInformation.owner3.fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="ownerInformation.owner3.address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Enter address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="ownerInformation.owner3.phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="ownerInformation.owner3.email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter email" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Preparer Information</h2>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Preparer Name</p>
                        <p className="text-sm">BRIAN SOTO, CPA</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Firm Name</p>
                        <p className="text-sm">SOTO ACCOUNTING</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Street</p>
                        <p className="text-sm">4252 N. CICERO AVE.</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">City, State, Zip</p>
                        <p className="text-sm">CHICAGO, IL 60641</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Fee Information</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">State Fee:</span> $150.00 + 3% PROCESSING FEE (LLC/CCORP)</p>
                      <p className="text-sm"><span className="font-medium">Regular Processing:</span> 7-10 BUSINESS DAYS</p>
                      <p className="text-sm"><span className="font-medium">Expedited Fee:</span> $100 + 3% PROCESSING FEE</p>
                      <p className="text-sm"><span className="font-medium">Expedited Processing:</span> 24HRS</p>
                      <p className="text-sm"><span className="font-medium">CPA Fee:</span> $250</p>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Attestation</h2>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm mb-4">To the best of my knowledge the above information is correct.</p>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="attestation.signatures.0.signHere"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Signature</FormLabel>
                            <FormControl>
                              <Input placeholder="Type your full name to sign" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="attestation.signatures.0.date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">Address:</span> 4252 N. Cicero Ave. Chicago, IL 60641</p>
                      <p className="text-sm"><span className="font-medium">Phone:</span> 312.715.8599</p>
                      <p className="text-sm"><span className="font-medium">Fax:</span> 312.489.2344</p>
                      <p className="text-sm"><span className="font-medium">Email:</span> brian@sotoaccounting.com</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!form.formState.isValid}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Step {step} of {totalSteps}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

