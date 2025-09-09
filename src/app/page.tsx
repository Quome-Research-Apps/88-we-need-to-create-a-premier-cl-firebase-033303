import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, BookOpen, BarChart2 } from 'lucide-react';
import Image from 'next/image';

const AppHeader = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2">
        <BrainCircuit className="h-7 w-7 text-primary" />
        <span className="text-xl font-bold text-foreground">SynapseSpark</span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Features
        </Link>
        <Link href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Pricing
        </Link>
        <Link href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Testimonials
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Get Started Free</Link>
        </Button>
      </div>
    </div>
  </header>
);


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <section className="w-full pt-32 pb-16 md:pt-48 md:pb-24 bg-gradient-to-b from-background to-background/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Unlock Your Learning Potential with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    SynapseSpark is an intelligent study partner that uses spaced repetition and AI to help you learn faster and remember more.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Start Learning for Free</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/600/400"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="learning technology"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Smarter Way to Study</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is packed with features designed to optimize your learning process, from AI-powered content creation to personalized analytics.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <BrainCircuit className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Deck Creation</h3>
                <p className="text-sm text-muted-foreground">Instantly generate flashcard decks from textbooks, notes, or web articles using the power of generative AI.</p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Spaced Repetition</h3>
                <p className="text-sm text-muted-foreground">Our adaptive algorithm schedules reviews at optimal intervals to transfer knowledge to your long-term memory.</p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <BarChart2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Performance Dashboard</h3>
                <p className="text-sm text-muted-foreground">Visualize your progress with insightful analytics on retention rates, study habits, and areas for improvement.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Simple, Transparent Pricing</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that's right for you. Get started for free, and upgrade when you're ready.
              </p>
            </div>
            <div className="mx-auto grid max-w-sm grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <p className="text-muted-foreground">For casual learners</p>
                  <div className="flex items-baseline gap-2 pt-4">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 text-left">
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-primary" /> Up to 3 AI-generated decks</li>
                    <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-primary" /> Basic analytics</li>
                    <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-primary" /> Community deck access</li>
                  </ul>
                  <Button variant="outline" className="w-full" asChild><Link href="/dashboard">Get Started</Link></Button>
                </CardContent>
              </Card>
              <Card className="border-primary shadow-lg">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <p className="text-muted-foreground">For serious students</p>
                  <div className="flex items-baseline gap-2 pt-4">
                    <span className="text-4xl font-bold">$10</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 text-left">
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-primary" /> Unlimited AI-generated decks</li>
                    <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-primary" /> Advanced analytics & insights</li>
                    <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-primary" /> Deck and card editing</li>
                    <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-primary" /> Priority support</li>
                  </ul>
                  <Button className="w-full" asChild><Link href="/dashboard">Upgrade to Pro</Link></Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 SynapseSpark. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
