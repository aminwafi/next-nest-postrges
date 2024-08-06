import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn()
          },
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should return true if no roles are specified', () => {
    // Mock Reflector to return undefined (no roles) for the handler
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

    const context = createMockExecutionContext();
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return true if user role is included in allowed roles', () => {
    const allowedRoles = ['admin', 'user'];
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(allowedRoles);

    const context = createMockExecutionContext({ role: 'admin' });
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw ForbiddenException if user role is not included in allowed roles', () => {
    const allowedRoles = ['admin'];
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(allowedRoles);

    const context = createMockExecutionContext({ role: 'user' });

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});

function createMockExecutionContext(user?: any): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        user: user || null,
      }),
    }),
    getHandler: () => jest.fn(),
    getClass: () => jest.fn(),
  } as unknown as ExecutionContext;
}
