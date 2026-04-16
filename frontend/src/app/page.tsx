import { redirect } from 'next/navigation';

export default function Home() {
  // Redirigimos automáticamente al dashboard del chofer por ahora
  // En el futuro, aquí iría el login o la selección de rol.
  redirect('/driver');
}
