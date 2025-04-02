
"use client";

import { useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { NewBusinessFormation } from '@/types/llc';
import { EntityInformationStep } from './components/steps/entity-information';
import { OwnerInformationStep } from './components/steps/owner-information';
import { PreparerInformationStep } from './components/steps/preparer-information';
import { AttestationStep } from './components/steps/attestation';
import { FormNavigation } from './components/form-navigation';


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
    let fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = [];

    if (step === 1) {
      fieldsToValidate = [
        'entityName',
        'entityAddress',
        'serviceProductOffered',
        'entityType',
        'expedite'
      ];
    } else if (step === 2) {
      fieldsToValidate = [
        'owners'
      ];
    } else if (step === 3) {
      fieldsToValidate = [
        'signatures'
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
              {step === 1 && <EntityInformationStep form={form} />}
              {step === 2 && <OwnerInformationStep form={form} />}
              {step === 3 && <PreparerInformationStep />}
              {step === 4 && <AttestationStep form={form} />}

              <FormNavigation
                step={step}
                totalSteps={totalSteps}
                prevStep={prevStep}
                nextStep={nextStep}
                isValid={form.formState.isValid}
                isSubmitting={form.formState.isSubmitting}
              />
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

