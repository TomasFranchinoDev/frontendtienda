'use client';

import { useMemo } from 'react';

interface PasswordStrengthProps {
    password: string;
}

interface StrengthCriteria {
    name: string;
    met: boolean;
}

type StrengthLevel = 1 | 2 | 3;

/**
 * PasswordStrength Component
 * 
 * Displays real-time password strength feedback with:
 * - 4-segment progress bar (Empty/Weak/Medium/Strong)
 * - Criteria checklist (length, uppercase, lowercase, number, special char)
 * - Color-coded visual feedback
 */
export function PasswordStrength({ password }: PasswordStrengthProps) {
    // Calculate strength level and criteria
    const { level, criteria } = useMemo(() => {
        const checks: StrengthCriteria[] = [
            {
                name: '8 caracteres mínimo',
                met: password.length >= 8,
            },
            {
                name: '1 letra mayúscula',
                met: /[A-Z]/.test(password),
            },
            {
                name: '1 letra minúscula',
                met: /[a-z]/.test(password),
            },
            {
                name: '1 número',
                met: /\d/.test(password),
            },
            {
                name: '1 carácter especial',
                met: /[!@#$%^&*()_+\-=\[\]{};:'",.< >?/\\|`~]/.test(password),
            },
        ];

        // Calculate strength level (1-3 only)
        let strengthLevel: StrengthLevel = 1; // Default to Weak (Red)
        const metCriteriaCount = checks.filter((c) => c.met).length;

        if (password.length >= 8 && metCriteriaCount === 5) {
            strengthLevel = 3; // Strong - all 5 criteria met (Green)
        } else if (password.length >= 8 && metCriteriaCount >= 3) {
            strengthLevel = 2; // Medium - 8+ chars with 3-4 criteria met (Yellow)
        } else {
            strengthLevel = 1; // Weak - default (Red)
        }

        return { level: strengthLevel, criteria: checks };
    }, [password]);

    // Color mapping - 3 levels only (Red, Yellow, Green)
    const getSegmentColor = (segmentIndex: number): string => {
        switch (level) {
            case 1: // Weak (Red) - fill first segment only
                return segmentIndex === 0 ? 'bg-red-500' : 'bg-gray-300';
            case 2: // Medium (Yellow) - fill first two segments
                return segmentIndex < 2 ? 'bg-yellow-500' : 'bg-gray-300';
            case 3: // Strong (Green) - fill all four segments
                return segmentIndex < 4 ? 'bg-green-500' : 'bg-gray-300';
            default:
                return 'bg-gray-300';
        }
    };

    const getLevelLabel = (): string => {
        switch (level) {
            case 1:
                return 'Débil';
            case 2:
                return 'Media';
            case 3:
                return 'Fuerte';
            default:
                return '';
        }
    };

    const getLevelColor = (): string => {
        switch (level) {
            case 1:
                return 'text-red-500';
            case 2:
                return 'text-yellow-600';
            case 3:
                return 'text-green-600';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="w-full space-y-3">
            {/* Only show when password has content */}
            {password.length === 0 ? (
                <div className="h-12" /> /* Spacer to prevent layout shift */
            ) : (
                <>
                    {/* Strength Label and Level Indicators (4 segments) */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Fortaleza de contraseña
                            </label>
                            <span className={`text-xs font-semibold ${getLevelColor()}`}>
                                {getLevelLabel()}
                            </span>
                        </div>

                        {/* 4 Progress Segments */}
                        <div className="flex gap-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="flex-1">
                                    <div
                                        className={`h-2 rounded-full transition-colors ${getSegmentColor(
                                            index
                                        )}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Criteria Checklist */}
                    <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-600">Requisitos:</p>
                        <ul className="space-y-1">
                            {criteria.map((criterion) => (
                                <li
                                    key={criterion.name}
                                    className="flex items-center gap-2 text-xs text-gray-700"
                                >
                                    <span className={criterion.met ? 'text-green-600' : 'text-red-400'}>
                                        {criterion.met ? '✓' : '✕'}
                                    </span>
                                    <span>{criterion.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}
