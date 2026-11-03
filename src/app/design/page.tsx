'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Check, IndianRupee, Zap, Shield, Leaf, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { HeroCanvas } from '@/components/3d/HeroCanvas';
import { PageTransition } from '@/components/providers/PageTransition';

export default function DesignSystemPage() {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);

  const simulateLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-surface-border">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight block">
                  ImVerde Design System
                </span>
                <span className="text-xs text-muted-fg uppercase tracking-widest">
                  Apple & Nike Craft Benchmark
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  Auth Screen
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="max-w-6xl mx-auto px-6 py-12 space-y-20">
          {/* Hero Section */}
          <section className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-muted text-accent-emerald border border-accent-emerald/20">
              <Leaf className="w-3.5 h-3.5" />
              Living Styleguide & Component Library
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.08]">
              Harmonizing clean energy, editorial typography, and 60fps motion.
            </h1>
            <p className="text-lg text-muted-fg max-w-2xl leading-relaxed">
              Tailored for India's decarbonization journey. Designed with deep forest green, crisp off-white, and physical spring physics.
            </p>
          </section>

          {/* Color Tokens Palette */}
          <section className="space-y-6">
            <div className="border-b border-surface-border pb-3">
              <h2 className="font-display text-2xl font-semibold">1. Color Palette Tokens</h2>
              <p className="text-sm text-muted-fg">Dynamically reactive CSS variables adapting seamlessly to Light and Dark modes.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <div className="rounded-2xl p-4 bg-primary text-primary-foreground flex flex-col justify-between h-32 border border-surface-border shadow-sm">
                <span className="text-xs font-semibold tracking-wider uppercase opacity-80">Primary</span>
                <div>
                  <div className="text-sm font-bold">Forest Green</div>
                  <div className="text-xs opacity-70">--color-primary</div>
                </div>
              </div>

              <div className="rounded-2xl p-4 bg-surface text-foreground flex flex-col justify-between h-32 border border-surface-border shadow-sm">
                <span className="text-xs font-semibold tracking-wider uppercase text-muted-fg">Surface</span>
                <div>
                  <div className="text-sm font-bold">Canvas Card</div>
                  <div className="text-xs text-muted-fg">--color-surface</div>
                </div>
              </div>

              <div className="rounded-2xl p-4 bg-background text-foreground flex flex-col justify-between h-32 border border-surface-border shadow-sm">
                <span className="text-xs font-semibold tracking-wider uppercase text-muted-fg">Canvas</span>
                <div>
                  <div className="text-sm font-bold">Off-White / Slate</div>
                  <div className="text-xs text-muted-fg">--color-bg</div>
                </div>
              </div>

              <div className="rounded-2xl p-4 bg-emerald-600 text-white flex flex-col justify-between h-32 shadow-sm">
                <span className="text-xs font-semibold tracking-wider uppercase opacity-80">Accent</span>
                <div>
                  <div className="text-sm font-bold">Solar Emerald</div>
                  <div className="text-xs opacity-80">--color-emerald</div>
                </div>
              </div>

              <div className="rounded-2xl p-4 bg-amber-500 text-white flex flex-col justify-between h-32 shadow-sm">
                <span className="text-xs font-semibold tracking-wider uppercase opacity-80">Accent</span>
                <div>
                  <div className="text-sm font-bold">Warm Amber</div>
                  <div className="text-xs opacity-80">--color-amber</div>
                </div>
              </div>

              <div className="rounded-2xl p-4 bg-muted text-muted-fg flex flex-col justify-between h-32 border border-surface-border shadow-sm">
                <span className="text-xs font-semibold tracking-wider uppercase">Neutral</span>
                <div>
                  <div className="text-sm font-bold text-foreground">Muted Gray</div>
                  <div className="text-xs">--color-muted</div>
                </div>
              </div>
            </div>
          </section>

          {/* Typography Scale */}
          <section className="space-y-6">
            <div className="border-b border-surface-border pb-3">
              <h2 className="font-display text-2xl font-semibold">2. Editorial Typography Scale</h2>
              <p className="text-sm text-muted-fg">Strict discipline: One architectural Display font, One balanced Body font.</p>
            </div>

            <div className="space-y-6 bg-surface/60 rounded-3xl p-8 border border-surface-border">
              <div>
                <span className="text-xs font-mono text-muted-fg uppercase tracking-widest block mb-1">Display Hero</span>
                <p className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
                  Save ₹4,250 & 320 kg CO₂
                </p>
              </div>

              <div>
                <span className="text-xs font-mono text-muted-fg uppercase tracking-widest block mb-1">Heading 1</span>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                  Your Karnataka (BESCOM) Clean Energy Audit
                </h1>
              </div>

              <div>
                <span className="text-xs font-mono text-muted-fg uppercase tracking-widest block mb-1">Heading 2</span>
                <h2 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                  Peak Consumption Hours & Daytime Solar Offset
                </h2>
              </div>

              <div>
                <span className="text-xs font-mono text-muted-fg uppercase tracking-widest block mb-1">Body Text</span>
                <p className="font-body text-base text-muted-fg leading-relaxed max-w-3xl">
                  By converting your base cooling load to BLDC smart inverters and shifting laundry cycles between 10:00 AM and 2:00 PM, your household can trim 22% of total tariff units while reducing peak grid stress.
                </p>
              </div>
            </div>
          </section>

          {/* Buttons & Magnetic Hover */}
          <section className="space-y-6">
            <div className="border-b border-surface-border pb-3 flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold">3. Interactive Magnetic Buttons</h2>
                <p className="text-sm text-muted-fg">Hover near the buttons to feel physical magnetic cursor tracking.</p>
              </div>
              <Button size="sm" variant="outline" onClick={simulateLoading}>
                Test Loading State
              </Button>
            </div>

            <div className="p-8 bg-surface/60 rounded-3xl border border-surface-border space-y-8">
              {/* Variants */}
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="lg" isLoading={btnLoading}>
                  Primary Action
                </Button>
                <Button variant="secondary" size="lg">
                  Secondary Action
                </Button>
                <Button variant="outline" size="lg">
                  Outline Border
                </Button>
                <Button variant="ghost" size="lg">
                  Ghost Button
                </Button>
                <Button variant="danger" size="lg">
                  Destructive
                </Button>
              </div>

              {/* Sizes */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-surface-border">
                <Button size="sm" variant="primary">
                  Small (sm)
                </Button>
                <Button size="md" variant="primary">
                  Medium Default (md)
                </Button>
                <Button size="lg" variant="primary">
                  Large Hero (lg)
                </Button>
                <Button size="md" disabled variant="primary">
                  Disabled State
                </Button>
              </div>
            </div>
          </section>

          {/* Cards Showcase */}
          <section className="space-y-6">
            <div className="border-b border-surface-border pb-3">
              <h2 className="font-display text-2xl font-semibold">4. Surface Cards & Metric Panels</h2>
              <p className="text-sm text-muted-fg">Soft rounded geometry with hairline borders and subtle GPU-accelerated lift.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card interactive className="flex flex-col justify-between">
                <CardHeader>
                  <div className="w-10 h-10 rounded-2xl bg-primary-muted text-accent-emerald flex items-center justify-center mb-2">
                    <Zap className="w-5 h-5" />
                  </div>
                  <CardTitle>420 kWh</CardTitle>
                  <CardDescription>Monthly Consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-fg">
                    14% lower than neighborhood average in Bengaluru North.
                  </p>
                </CardContent>
                <CardFooter className="justify-between text-xs text-muted-fg">
                  <span>DISCOM: BESCOM</span>
                  <span className="text-accent-emerald font-semibold">Tier 2 Tariff</span>
                </CardFooter>
              </Card>

              <Card interactive className="flex flex-col justify-between">
                <CardHeader>
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <CardTitle>₹3,480</CardTitle>
                  <CardDescription>Estimated Bill Amount</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-fg">
                    Potential savings of ₹850/mo identified via solar water heating.
                  </p>
                </CardContent>
                <CardFooter className="justify-between text-xs text-muted-fg">
                  <span>Due in 12 days</span>
                  <span className="text-amber-500 font-semibold">High Opportunity</span>
                </CardFooter>
              </Card>

              <Card interactive className="flex flex-col justify-between">
                <CardHeader>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5" />
                  </div>
                  <CardTitle>344 kg CO₂</CardTitle>
                  <CardDescription>Total Carbon Footprint</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-fg">
                    Calculated using CEA (Central Electricity Authority) India grid emission factor (0.82 kg CO₂/kWh).
                  </p>
                </CardContent>
                <CardFooter className="justify-between text-xs text-muted-fg">
                  <span>Grid: Southern Regional</span>
                  <span className="text-emerald-500 font-semibold">Verified</span>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Form Inputs */}
          <section className="space-y-6">
            <div className="border-b border-surface-border pb-3">
              <h2 className="font-display text-2xl font-semibold">5. Form Inputs & Validation States</h2>
              <p className="text-sm text-muted-fg">Inputs designed for Indian utility billing with accessible error and helper states.</p>
            </div>

            <div className="p-8 bg-surface/60 rounded-3xl border border-surface-border grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Consumer Account Number"
                placeholder="e.g. 1029384756"
                helperText="Found on top-right of your DISCOM electricity bill"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                leadingIcon={<FileText className="w-4 h-4" />}
              />

              <Input
                label="Monthly Bill Amount (₹ INR)"
                placeholder="3500"
                leadingIcon={<IndianRupee className="w-4 h-4" />}
                trailingIcon={<span className="text-xs font-semibold text-muted-fg">INR</span>}
              />

              <Input
                label="Validation Error State"
                value="invalid_account_format"
                error="Account number must be 10 digits as issued by BESCOM."
                onChange={() => {}}
              />

              <Input
                label="Disabled Form Field"
                value="TANGEDCO (Tamil Nadu Grid)"
                disabled
              />
            </div>
          </section>

          {/* 3D React Three Fiber Element */}
          <section className="space-y-6">
            <div className="border-b border-surface-border pb-3">
              <h2 className="font-display text-2xl font-semibold">6. Ambient 3D Visual Scene (React Three Fiber)</h2>
              <p className="text-sm text-muted-fg">Lightweight, interactive Three.js prism rendered in real-time. Hover over the crystal to interact.</p>
            </div>

            <Card className="overflow-hidden p-0 relative border border-surface-border bg-surface/40 flex flex-col items-center justify-center">
              <HeroCanvas className="w-full h-80 sm:h-96" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-fg bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-surface-border">
                  Interactive WebGL R3F
                </span>
                <span className="text-xs text-muted-fg bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-surface-border">
                  Hardware Accelerated (60fps)
                </span>
              </div>
            </Card>
          </section>

          {/* Bottom Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-3xl bg-primary text-primary-foreground gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold">Ready to test authentication?</h3>
              <p className="text-sm opacity-80 mt-1">Experience the clean Email OTP and Google Sign-In interface.</p>
            </div>
            <Link href="/auth">
              <Button variant="secondary" size="lg" className="text-foreground flex items-center gap-2">
                <span>Go to Auth Screen</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}

