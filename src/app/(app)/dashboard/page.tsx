import { Suspense } from 'react';
import AiDeckGenerator from '@/components/ai-deck-generator';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

const chartData = [
  { name: 'Mon', studied: 30 },
  { name: 'Tue', studied: 45 },
  { name: 'Wed', studied: 60 },
  { name: 'Thu', studied: 25 },
  { name: 'Fri', studied: 50 },
  { name: 'Sat', studied: 75 },
  { name: 'Sun', studied: 40 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Let's get learning.</p>
      </div>

      <AiDeckGenerator />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Decks Created</CardTitle>
            <CardDescription>Total number of decks in your library.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cards Mastered</CardTitle>
            <CardDescription>Cards moved to long-term memory.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,402</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Study Streak</CardTitle>
            <CardDescription>Consecutive days you've studied.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">28 Days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>Cards studied in the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Bar dataKey="studied" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
