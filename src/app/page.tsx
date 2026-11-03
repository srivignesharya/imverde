'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, UploadCloud, ShieldCheck, IndianRupee, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { HeroCanvas } from '@/components/3d/HeroCanvas';
import { PageTransition } from '@/components/providers/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20">
        {/* Navigation */}
        <header className="w-full border-b border-surface-border backdrop-blur-md bg-background/80 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-foreground">
                ImVerde
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/design">
                <Button variant="ghost" size="sm">
                  Design System
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24 flex flex-col items-center text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-muted text-accent-emerald border border-accent-emerald/20">
            <Leaf className="w-3.5 h-3.5" />
            <span>Built for India’s Decarbonization Journey</span>
          </div>

          <div className="space-y-6 max-w-4xl">
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground leading-[1.02]">
              Your electricity bill, decoded for <span className="text-accent-emerald">climate & wallet.</span>
            </h1>
            <p className="font-body text-lg sm:text-xl text-muted-fg max-w-2xl mx-auto leading-relaxed">
              Upload your Indian DISCOM power bill. Our multimodal AI calculates your precise grid carbon footprint and surfaces high-ROI actions to save money and CO₂.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/auth">
              <Button size="lg" variant="primary" className="flex items-center gap-2">
                <span>Upload Your First Bill</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/design">
              <Button size="lg" variant="secondary">
                Review Design System
              </Button>
            </Link>
          </div>

          {/* Interactive 3D Showcase */}
          <div className="w-full max-w-2xl my-8">
            <HeroCanvas className="w-full h-72 sm:h-80" />
          </div>

          {/* Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left pt-8">
            <Card interactive className="p-6">
              <CardHeader className="p-0 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-primary-muted text-accent-emerald flex items-center justify-center mb-3">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl">Instant AI Extraction</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-sm text-muted-fg leading-relaxed">
                Powered by Gemini multimodal processing. Supports PDF and camera captures from BESCOM, TANGEDCO, MSEDCL, and BSES.
              </CardContent>
            </Card>

            <Card interactive className="p-6">
              <CardHeader className="p-0 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl">Actionable Savings</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-sm text-muted-fg leading-relaxed">
                Personalized steps to trim tariff slab costs with payback timeframes, solar net-metering options, and appliance ROI.
              </CardContent>
            </Card>

            <Card interactive className="p-6">
              <CardHeader className="p-0 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl">Ephemeral Privacy</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-sm text-muted-fg leading-relaxed">
                Your uploaded documents are securely processed in private buckets and automatically deleted immediately after extraction.
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-surface-border py-8 text-xs text-muted-fg">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>© 2026 ImVerde Technologies. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <Link href="/design" className="hover:text-foreground transition-colors">
                Design System (/design)
              </Link>
              <Link href="/auth" className="hover:text-foreground transition-colors">
                Sign In (/auth)
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}

