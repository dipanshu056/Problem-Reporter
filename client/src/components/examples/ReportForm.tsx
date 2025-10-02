import { ReportForm } from "../ReportForm";

export default function ReportFormExample() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-background">
      <ReportForm
        onSubmit={(data) => {
          console.log("Form submitted:", data);
          alert("Report submitted successfully!");
        }}
      />
    </div>
  );
}
