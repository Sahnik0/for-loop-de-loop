export default function Footer() {
  return (
    <footer className="bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">for loop de loop</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Building powerful digital solutions with simplicity at heart
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} for loop de loop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
