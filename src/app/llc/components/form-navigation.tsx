import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function FormNavigation({
  step,
  totalSteps,
  prevStep,
  nextStep,
  isValid,
  isSubmitting
}: {
  step: number;
  totalSteps: number;
  prevStep: () => void;
  nextStep: () => void;
  isValid: boolean;
  isSubmitting: boolean;
  pendingSubmission?: boolean;
}) {
  return (
    <div className="flex justify-between pt-4">
      {step > 1 && (
        <Button type="button" variant="outline" onClick={prevStep}>
          Previous
        </Button>
      )}
      {step <= totalSteps ? (
        <Button
          type="button"
          onClick={nextStep}
          disabled={!isValid || isSubmitting}
        >
          Next
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[150px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {pendingSubmission ? 'Completing Submission...' : 'Submitting...'}
            </>
          ) : (
            'Submit Application'
          )}
        </Button>
      )}
    </div>
  );
}
