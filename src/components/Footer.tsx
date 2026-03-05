export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>© {currentYear} Jorge Moreira. All rights reserved.</p>
      </div>
    </footer>
  );
}
