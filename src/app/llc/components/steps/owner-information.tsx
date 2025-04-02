import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function OwnerInformationStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Owner Information</h2>
      
      {form.watch('owners').map((owner: any, index: number) => (
        <Accordion key={index} type="single" collapsible className="w-full">
          <AccordionItem value={`owner-${index}`}>
            <AccordionTrigger>
              {index === 0 ? 'Primary Owner (Responsible Party)' : `Additional Owner ${index + 1}`}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name={`owners.${index}.fullName`}
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
                  name={`owners.${index}.address`}
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
                  name={`owners.${index}.phone`}
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
                  name={`owners.${index}.email`}
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

                {index === 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name={`owners.${index}.ssn`}
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
                      name={`owners.${index}.dob`}
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
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          form.setValue('owners', [
            ...form.getValues('owners'),
            {
              fullName: '',
              address: '',
              phone: '',
              email: '',
              ownerNumber: form.getValues('owners').length + 1,
              responsibleParty: false
            }
          ]);
        }}
      >
        Add Additional Owner
      </Button>
    </div>
  );
}
