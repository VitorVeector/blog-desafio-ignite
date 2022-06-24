import Link from 'next/link'

export default function Header() {
  return (
    <Link href="/">
      <a>
        <img src='/logo.svg' alt="Logo"/>
      </a>
    </Link>
  )
}
