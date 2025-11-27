import { Button } from "@/components/ui/button";

/**
 * Comprehensive examples of Button component with all variants and colors
 */
export function ButtonExamples() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Button Component Examples</h1>

      {/* Contained Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Contained Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="contained" color="success">Success</Button>
          <Button variant="contained" color="orange">Orange</Button>
          <Button variant="contained" color="gray">Gray</Button>
          <Button variant="contained" color="indigo">Indigo</Button>
          <Button variant="contained" color="blue">Blue</Button>
          <Button variant="contained" color="error">Error</Button>
        </div>
      </section>

      {/* Outlined Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Outlined Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outlined" color="primary">Primary</Button>
          <Button variant="outlined" color="secondary">Secondary</Button>
          <Button variant="outlined" color="success">Success</Button>
          <Button variant="outlined" color="orange">Orange</Button>
          <Button variant="outlined" color="gray">Gray</Button>
          <Button variant="outlined" color="indigo">Indigo</Button>
          <Button variant="outlined" color="blue">Blue</Button>
          <Button variant="outlined" color="error">Error</Button>
        </div>
      </section>

      {/* Ghost Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Ghost Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="ghost" color="primary">Primary</Button>
          <Button variant="ghost" color="secondary">Secondary</Button>
          <Button variant="ghost" color="success">Success</Button>
          <Button variant="ghost" color="orange">Orange</Button>
          <Button variant="ghost" color="gray">Gray</Button>
          <Button variant="ghost" color="indigo">Indigo</Button>
          <Button variant="ghost" color="blue">Blue</Button>
          <Button variant="ghost" color="error">Error</Button>
        </div>
      </section>

      {/* Link Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Link Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="link" color="primary">Primary</Button>
          <Button variant="link" color="secondary">Secondary</Button>
          <Button variant="link" color="success">Success</Button>
          <Button variant="link" color="orange">Orange</Button>
          <Button variant="link" color="gray">Gray</Button>
          <Button variant="link" color="indigo">Indigo</Button>
          <Button variant="link" color="blue">Blue</Button>
          <Button variant="link" color="error">Error</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" variant="contained" color="primary">Small</Button>
          <Button size="default" variant="contained" color="primary">Default</Button>
          <Button size="lg" variant="contained" color="primary">Large</Button>
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Disabled State</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="contained" color="primary" disabled>Contained Disabled</Button>
          <Button variant="outlined" color="primary" disabled>Outlined Disabled</Button>
          <Button variant="ghost" color="primary" disabled>Ghost Disabled</Button>
          <Button variant="link" color="primary" disabled>Link Disabled</Button>
        </div>
      </section>

      {/* Loading State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Loading State</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="contained" color="primary" loading>Loading...</Button>
          <Button variant="outlined" color="success" loading>Processing</Button>
          <Button variant="ghost" color="blue" loading>Fetching</Button>
          <Button variant="contained" color="error" loading>Deleting</Button>
        </div>
      </section>

      {/* Icon Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Icon Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-sm" variant="contained" color="primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Button>
          <Button size="icon" variant="contained" color="primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Button>
          <Button size="icon-lg" variant="contained" color="primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Button>
        </div>
      </section>
    </div>
  );
}
