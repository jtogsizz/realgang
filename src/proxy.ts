import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Redireciona qualquer acesso vindo de *.vercel.app para o domínio oficial
  if (hostname.includes('vercel.app')) {
    // 308 Permanent Redirect mantém o método HTTP e avisa os motores de busca
    return NextResponse.redirect(`https://realgang.life${request.nextUrl.pathname}${request.nextUrl.search}`, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Aplica o middleware em todas as rotas, EXCETO:
     * - rotas de API (/api)
     * - arquivos estáticos do Next.js (/_next/static)
     * - arquivos de otimização de imagem (/_next/image)
     * - arquivos da raiz (favicon.ico, etc)
     * Isso garante que assets e builds não quebrem e que o middleware rode rápido.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
