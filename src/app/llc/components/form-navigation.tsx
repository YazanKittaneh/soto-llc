import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function FormNavigation({
  step,
  totalSteps,
  prevStep,
  nextStep,
  isValid,
  isSubmitting,
}: {
  step: number;
  totalSteps: number;
  prevStep: () => void;
  nextStep: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}) {
  return (
    <div className="flex justify-between pt-4 gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Login</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {step > 1 && (
        <Button type="button" variant="outline" onClick={prevStep}>
          Previous
        </Button>
      )}
      {step <= totalSteps ? (
        <Button
          type="button"
          onClick={nextStep}
          disabled={false}
        >
          Next
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
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
  );
}

