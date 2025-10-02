import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhotoUpload } from "./PhotoUpload";
import { LocationMap } from "./LocationMap";
import { Clock } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string().optional(),
  }),
  photo: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ReportFormProps {
  onSubmit: (data: FormValues) => void;
  isSubmitting?: boolean;
}

export function ReportForm({ onSubmit, isSubmitting }: ReportFormProps) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [currentTime] = useState(new Date());

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({ ...values, photo });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Problem Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <PhotoUpload onPhotoChange={setPhoto} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LocationMap
                      onLocationChange={(lat, lng, address) => {
                        field.onChange({ lat, lng, address });
                      }}
                      initialPosition={{
                        lat: field.value.lat,
                        lng: field.value.lng,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Problem Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Broken street light"
                      {...field}
                      data-testid="input-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the problem in detail..."
                      className="min-h-32"
                      {...field}
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                Reported on: {currentTime.toLocaleDateString()} at{" "}
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
          data-testid="button-submit-report"
        >
          {isSubmitting ? "Submitting..." : "Submit Problem Report"}
        </Button>
      </form>
    </Form>
  );
}
