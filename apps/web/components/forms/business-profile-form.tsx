"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm, type UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

import { useReplaceServicesMutation, useBusinessProfileQuery, useServicesQuery, useUpdateBusinessProfileMutation } from '../../lib/hooks/useBusinessProfile';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const businessSchema = z.object({
  name: z.string().min(1, 'Business name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
  hours: z.string().min(1, 'Hours are required'),
  website: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  primaryService: z.string().min(1, 'Add at least one service'),
  secondaryService: z.string().optional(),
  tertiaryService: z.string().optional(),
});

const categoryPresets = [
  'Salon / Barber',
  'Fitness Studio',
  'Medspa / Aesthetics',
  'Real Estate',
  'Home Services',
  'Healthcare',
];

type FormValues = z.infer<typeof businessSchema>;

export function BusinessProfileForm() {
  const { data: business, isLoading: businessLoading } = useBusinessProfileQuery();
  const { data: services, isLoading: servicesLoading } = useServicesQuery();
  const updateBusiness = useUpdateBusinessProfileMutation();
  const replaceServices = useReplaceServicesMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const defaultServices = useMemo(() => services ?? [], [services]);
  const [primary = '', secondary = '', tertiary = ''] = defaultServices
    .filter((service) => service.isActive)
    .map((service) => service.name)
    .slice(0, 3);

  const form = useForm<FormValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: business?.name ?? '',
      category: business?.category ?? '',
      description: business?.description ?? '',
      location: business?.location ?? '',
      hours: business?.hours ?? '',
      website: business?.website ?? '',
      primaryService: primary,
      secondaryService: secondary,
      tertiaryService: tertiary,
    },
    values: business
      ? {
          name: business.name,
          category: business.category,
          description: business.description,
          location: business.location,
          hours: business.hours,
          website: business.website ?? '',
          primaryService: primary,
          secondaryService: secondary,
          tertiaryService: tertiary,
        }
      : undefined,
  });

  const isSubmitting = updateBusiness.isLoading || replaceServices.isLoading;
  const isLoading = businessLoading || servicesLoading;

  const handleSubmit = form.handleSubmit(async (values) => {
    setSuccessMessage(null);
    await updateBusiness.mutateAsync({
      name: values.name,
      category: values.category,
      description: values.description,
      location: values.location,
      hours: values.hours,
      website: values.website || undefined,
    });

    const activeServices = [values.primaryService, values.secondaryService, values.tertiaryService]
      .map((service) => service?.trim())
      .filter(Boolean) as string[];

    if (activeServices.length > 0) {
      await replaceServices.mutateAsync({
        services: activeServices.map((name) => ({
          name,
          description: `${name} offering`,
          durationMinutes: 45,
          price: 0,
          isActive: true,
        })),
      });
    }

    setSuccessMessage('Business profile updated successfully.');
  });

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card className="border-border/60 bg-card/90">
          <CardHeader>
            <CardTitle>Business identity</CardTitle>
            <CardDescription>Tell us the basics so we can tailor templates and scheduling defaults.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Business name</Label>
                <Input id="name" disabled={isLoading} {...form.register('name')} />
                <FormError error={form.formState.errors.name?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input list="category-presets" id="category" disabled={isLoading} {...form.register('category')} />
                <datalist id="category-presets">
                  {categoryPresets.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
                <FormError error={form.formState.errors.category?.message} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={4} disabled={isLoading} {...form.register('description')} />
              <FormError error={form.formState.errors.description?.message} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" disabled={isLoading} {...form.register('location')} />
                <FormError error={form.formState.errors.location?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Hours</Label>
                <Input id="hours" disabled={isLoading} {...form.register('hours')} />
                <FormError error={form.formState.errors.hours?.message} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="https://" disabled={isLoading} {...form.register('website')} />
                <FormError error={form.formState.errors.website?.message} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Launch checklist progress</CardTitle>
            <CardDescription>
              Completing this form marks <span className="font-semibold">Business profile</span> as done in the 30-minute launch
              checklist.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge variant={business?.onboardingCompletedSteps.includes('business-profile') ? 'accent' : 'outline'}>
              Business profile {business?.onboardingCompletedSteps.includes('business-profile') ? 'complete' : 'in progress'}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Services here power smart defaults for integrations, offers, and scheduling.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-border/60 bg-card/90">
          <CardHeader>
            <CardTitle>Top services</CardTitle>
            <CardDescription>
              These services appear in integration mapping, offer templates, and DM assistant prompts. Keep them brief and focused
              on your most popular offerings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 md:grid-cols-3">
              <ServiceField
                id="primaryService"
                label="Primary service"
                placeholder="e.g. Intro cut + style"
                error={form.formState.errors.primaryService?.message}
                register={form.register}
                disabled={isLoading}
              />
              <ServiceField
                id="secondaryService"
                label="Secondary service"
                placeholder="e.g. Color refresh"
                error={form.formState.errors.secondaryService?.message}
                register={form.register}
                disabled={isLoading}
              />
              <ServiceField
                id="tertiaryService"
                label="Tertiary service"
                placeholder="e.g. Blowout"
                error={form.formState.errors.tertiaryService?.message}
                register={form.register}
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Need more services? You can manage the full catalog in the Library &rarr; Services section once it launches.
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="flex items-center justify-between">
        {successMessage ? <p className="text-sm text-success-foreground">{successMessage}</p> : <span />}
        <Button type="submit" size="lg" disabled={isSubmitting || isLoading}>
          {isSubmitting ? 'Saving...' : 'Save business profile'}
        </Button>
      </div>
    </form>
  );
}

type ServiceFieldProps = {
  id: keyof FormValues;
  label: string;
  placeholder: string;
  error?: string;
  register: UseFormRegister<FormValues>;
  disabled?: boolean;
};

function ServiceField({ id, label, placeholder, error, register, disabled }: ServiceFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} disabled={disabled} {...register(id)} />
      <FormError error={error} />
    </div>
  );
}

function FormError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return <p className="text-xs text-destructive" role="alert">{error}</p>;
}
