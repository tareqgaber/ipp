import { Link, Outlet } from "react-router";
import Logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useBreakpoint } from "@/hooks";

export function SiteLayout() {
  const { isBelow } = useBreakpoint();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <Container className="py-4.5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <img src={Logo} alt="Logo" className="h-8" />
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Button
              variant="outlined"
              color="gray"
              asChild
              size={isBelow("md") ? "md" : "lg"}
              className="shadow-none"
            >
              <Link to="/login">Log In</Link>
            </Button>
            <Button
              asChild
              size={isBelow("md") ? "md" : "lg"}
              className="shadow-none"
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <Container className="py-6 flex items-center justify-between text-sm text-muted-foreground">
          {/* Copyright */}
          <div>© 2024 Company Name. All rights reserved.</div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
