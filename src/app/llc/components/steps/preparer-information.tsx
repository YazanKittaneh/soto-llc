import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';



export function PreparerInformationStep({ form }: { form: any }) {
  return (
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

      <FormField
        control={form.control}
        name="preparerAcknowledged"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I acknowledge that I have reviewed the preparer information and fee details above
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
