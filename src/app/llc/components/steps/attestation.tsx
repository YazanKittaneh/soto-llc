import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function AttestationStep({ form }: { form: any }) {
  const [submitting, setSubmitting] = useState(false)
  return (
    <div className="space-y-6 relative">
      {submitting && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      <h2 className="text-xl font-semibold">Attestation</h2>

      <div className="bg-gray-50 p-4 rounded-md">
        <p className="text-sm mb-4">To the best of my knowledge the above information is correct.</p>

        <div className="space-y-4">
          {form.watch('owners').map((owner: any, index: number) => (
            <div key={index} className="space-y-4">
              <h3 className="font-medium">{owner.fullName || `Owner ${index + 1}`}</h3>
              <FormField
                control={form.control}
                name={`signatures.${index}.signHere`}
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
                name={`signatures.${index}.date`}
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
          ))}
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
  );
}
