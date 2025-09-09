import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function PerformancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance</h1>
        <p className="text-muted-foreground">Track your learning progress and find areas for improvement.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Deeper insights into your learning journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Detailed performance analytics are under construction. Check back soon for advanced visualizations of your study habits and memory retention!</p>
        </CardContent>
      </Card>
    </div>
  )
}
