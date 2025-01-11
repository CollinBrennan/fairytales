import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  name?: string
}

export default function PageContainer({ name, children }: Props) {
  return (
    <main className="mx-auto w-full max-w-screen-xl pt-4 px-4">
      {name && <h1 className="text-2xl font-bold pb-8">{name}</h1>}
      {children}
    </main>
  )
}
