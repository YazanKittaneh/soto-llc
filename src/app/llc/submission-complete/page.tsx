import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function SubmissionComplete() {
  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            Submission Complete!
          </CardTitle>
          <CardDescription>
            Your business formation application has been successfully submitted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              We&apos;ve received your application and will process it shortly. You&apos;ll 
              receive an email confirmation with next steps.
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/llc">Start New Application</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
