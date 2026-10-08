import { Container, Button } from '../components/ui';

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <div className="text-gradient-red text-[120px] leading-none font-normal tracking-tight">404</div>
        <h1 className="mt-4 text-3xl tracking-tight">We lost the connection.</h1>
        <p className="mt-2 text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Button to="/" arrow>Back home</Button>
          <Button to="/solutions" variant="outline">Solutions</Button>
        </div>
      </div>
    </Container>
  );
}
