import { Suspense } from 'react';

import { BusinessProfileForm } from '../../../components/forms/business-profile-form';
import { Skeleton } from '../../../components/ui/skeleton';

function BusinessProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <Skeleton className="h-48" />
    </div>
  );
}

export default function BusinessProfilePage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Business profile</h1>
        <p className="max-w-2xl text-muted-foreground">
          Update your category, location, hours, and top services. These details power smart defaults across the 30-minute launch
          checklist and downstream flows.
        </p>
      </div>
      <Suspense fallback={<BusinessProfileSkeleton />}>
        <BusinessProfileForm />
      </Suspense>
    </section>
  );
}
