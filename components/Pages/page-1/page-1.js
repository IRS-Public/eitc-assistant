import Heading from '../../Heading'

export default function Page1() {
  return (
    <>
      <Heading
        level="2"
        className="text-2xl my-2 font-bold fade-in"
        data-testid="page1Title"
      >
        Page 1
      </Heading>

      <p className="fade-in mt-6" data-testid="page1Subtitle">
        page1.p.subtitle
      </p>
    </>
  )
}
