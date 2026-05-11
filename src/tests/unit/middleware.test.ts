import { NextRequest, NextResponse } from 'next/server';
import { proxy } from '@/proxy';

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn().mockReturnValue({ type: 'next' }),
    redirect: jest.fn().mockImplementation((url) => ({ type: 'redirect', url })),
  },
}));

describe('Middleware Proxy', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createRequest = (pathname: string, cookies: Record<string, string> = {}) => {
    const url = new URL(`http://localhost:3000${pathname}`);
    return {
      nextUrl: { pathname },
      url: url.toString(),
      method: 'GET',
      cookies: {
        get: (name: string) => (cookies[name] ? { value: cookies[name] } : undefined),
      },
    } as unknown as NextRequest;
  };

  it('should redirect unauthenticated users to login for protected routes', () => {
    const req = createRequest('/dashboard');
    proxy(req);
    
    expect(NextResponse.redirect).toHaveBeenCalled();
    const redirectUrl = (NextResponse.redirect as jest.Mock).mock.calls[0][0];
    expect(redirectUrl.toString()).toContain('/login');
  });

  it('should allow public routes without authentication', () => {
    const req = createRequest('/login');
    proxy(req);
    
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it('should redirect to KYC if unverified', () => {
    const req = createRequest('/dashboard', { 
      'session-token': 'valid',
      'kyc-status': 'Unverified'
    });
    proxy(req);
    
    expect(NextResponse.redirect).toHaveBeenCalled();
    const redirectUrl = (NextResponse.redirect as jest.Mock).mock.calls[0][0];
    expect(redirectUrl.toString()).toContain('/onboarding/kyc');
  });

  it('should redirect to verification if pending', () => {
    const req = createRequest('/dashboard', { 
      'session-token': 'valid',
      'kyc-status': 'Pending'
    });
    proxy(req);
    
    expect(NextResponse.redirect).toHaveBeenCalled();
    const redirectUrl = (NextResponse.redirect as jest.Mock).mock.calls[0][0];
    expect(redirectUrl.toString()).toContain('/onboarding/verification');
  });

  it('should allow verified users to access dashboard', () => {
    const req = createRequest('/dashboard', { 
      'session-token': 'valid',
      'kyc-status': 'Verified'
    });
    proxy(req);
    
    expect(NextResponse.next).toHaveBeenCalled();
  });
});
