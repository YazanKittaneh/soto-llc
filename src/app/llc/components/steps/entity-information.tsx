"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormData } from '../../page';
import { Control, FieldValues, UseFormReturn } from 'react-hook-form';


export function EntityInformationStep(form: { control: Control<FieldValues, any, FieldValues> | undefined; }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Entity Information</h2>

      <FormField
        control={form.control}
        name="entityName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Entity Name</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter entity name" {...field} />
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
              <Textarea placeholder="Describe your service or product" {...field} />
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
  );
}
