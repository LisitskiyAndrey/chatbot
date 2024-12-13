const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const emailValid = (email: string) => {
	return emailRegex.test(email)
}
