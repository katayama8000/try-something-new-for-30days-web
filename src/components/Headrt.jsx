import Link from 'next/link'

export function Header() {
    return (
        <header>
            <Link href="/">
                <a>index</a>
            </Link>
            <Link href="/about">
                <a>about</a>
            </Link>
        </header>
    )
}
