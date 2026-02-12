export async function retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
): Promise<T> {
    let lastError: unknown;
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error: unknown) {
            lastError = error;
            const backoff = delay * Math.pow(2, i);
            await new Promise((resolve) => setTimeout(resolve, backoff));
        }
    }
    throw lastError;
}
