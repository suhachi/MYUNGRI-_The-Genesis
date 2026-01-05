import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Start } from './Start';
import { describe, it, expect, vi } from 'vitest';

// Mock useNavigate
const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

describe('Start Component IME Safety', () => {
    it('should retain raw characters during hancul composition', () => {
        render(
            <BrowserRouter>
                <Start />
            </BrowserRouter>
        );

        const input = screen.getByLabelText(/이름/i) as HTMLInputElement;

        // Simulate typing "배"
        // 1. "ㅂ"
        fireEvent.compositionStart(input);
        fireEvent.change(input, { target: { value: 'ㅂ' } });
        expect(input.value).toBe('ㅂ');

        // 2. "배"
        fireEvent.change(input, { target: { value: '배' } });
        expect(input.value).toBe('배');

        // 3. Complete composition
        fireEvent.compositionEnd(input, { currentTarget: { value: '배' } });
        expect(input.value).toBe('배');
    });

    it('should keep Hanja conversion intact', () => {
        render(
            <BrowserRouter>
                <Start />
            </BrowserRouter>
        );

        const input = screen.getByLabelText(/이름/i) as HTMLInputElement;

        // Simulate Hanja conversion "裵"
        fireEvent.compositionStart(input);
        fireEvent.change(input, { target: { value: '裵' } });
        expect(input.value).toBe('裵');

        fireEvent.compositionEnd(input, { currentTarget: { value: '裵' } });
        expect(input.value).toBe('裵');
    });

    it('should strip illegal special characters ONLY after submission or composition end', () => {
        render(
            <BrowserRouter>
                <Start />
            </BrowserRouter>
        );

        const input = screen.getByLabelText(/이름/i) as HTMLInputElement;

        // Type "배!" (illegal char !)
        fireEvent.change(input, { target: { value: '배!' } });
        // During input, we don't sanitize yet to be safe
        expect(input.value).toBe('배!');

        // End composition (some browsers might trigger it here)
        fireEvent.compositionEnd(input, { currentTarget: { value: '배!' } });
        // After composition end, SSOT sanitizer should have stripped it
        expect(input.value).toBe('배');
    });

    it('should allow spaces (e.g., "A B") and mixed scripts (e.g., "배 裵 Su")', () => {
        render(
            <BrowserRouter>
                <Start />
            </BrowserRouter>
        );

        const input = screen.getByLabelText(/이름/i) as HTMLInputElement;

        // "A B"
        fireEvent.change(input, { target: { value: 'A B' } });
        fireEvent.compositionEnd(input, { currentTarget: { value: 'A B' } });
        expect(input.value).toBe('A B');

        // Mixed "배 裵 Su"
        fireEvent.change(input, { target: { value: '배 裵 Su' } });
        fireEvent.compositionEnd(input, { currentTarget: { value: '배 裵 Su' } });
        expect(input.value).toBe('배 裵 Su');
    });

    it('should allow 1-character names per policy', () => {
        render(
            <BrowserRouter>
                <Start />
            </BrowserRouter>
        );

        const input = screen.getByLabelText(/이름/i) as HTMLInputElement;

        fireEvent.change(input, { target: { value: '홍' } });
        expect(input.value).toBe('홍');

        // No error should be shown for length if specified (checking if validator is silent)
        const error = screen.queryByText(/글자 이상/i);
        expect(error).toBeNull();
    });
});
