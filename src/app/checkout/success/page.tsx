import { Button } from '@/components/ui/button'
import { checkoutVerify } from '@/lib/actions/payments'
import { stripe } from '@/lib/stripe'
import { ArrowRightIcon, CheckIcon, ShieldCheckIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string
  }>
}
export default async function Success({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const { status, customer_email, metadata, payment_intent, payment_status } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent'],
    })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete' && payment_status === 'paid') {
    console.log(customer_email, metadata, payment_intent, payment_status)
    const result = await checkoutVerify(session_id)
    console.log(result)   
    return (
      <section id='success'>
        <p>
          We appreciate your business! A confirmation email will be sent to . If
          you have any questions, please email
          <a href='mailto:orders@example.com'>orders@example.com</a>.
        </p>
        <div className='flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8 text-zinc-100'>
          <main className='w-full max-w-105 rounded-2xl bg-zinc-900 px-6 pt-8 pb-9 text-center'>
            {/* Success mark */}
            <div className='flex justify-center'>
              <span className='flex size-12 items-center justify-center rounded-full bg-emerald-900'>
                <CheckIcon className='size-6 stroke-3 text-emerald-400' />
              </span>
            </div>

            {/* Status badge */}
            <span className='mt-6 inline-flex items-center rounded-full bg-indigo-950 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-indigo-300 uppercase'>
              Upgrade Successful
            </span>

            {/* Heading */}
            <h1 className='mt-4 font-heading text-[22px] font-bold tracking-tight text-white'>
              Welcome to Hireloop Pro
            </h1>

            {/* Payment summary */}
            <p className='mt-5 text-sm text-zinc-400'>
              Your payment of{' '}
              <span className='font-semibold text-white'>$20.00</span> was
              received perfectly.
            </p>

            <p className='mt-4 text-sm leading-6 text-zinc-500'>
              All advanced premium recruiting modules are unlocked on your
              account.{' '}
              <span className='text-emerald-400'>
                You may need to re-authenticate to see the effect.
              </span>
            </p>

            {/* Session id */}
            <div className='mt-7 flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-800/40 px-4 py-3.5 text-left'>
              <span className='flex items-center gap-2 text-[13px] text-zinc-400'>
                <ShieldCheckIcon className='size-4 shrink-0 text-zinc-400' />
                Session ID Verified
              </span>

              <code className='rounded-md bg-slate-900 px-2 py-1 font-mono text-[11px] text-slate-300'>
                cs_test_a1846jfE3C1bX9B...
              </code>
            </div>

            {/* Call to action */}
            <Button className='mt-8 h-12 w-full gap-2 rounded-xl bg-white text-sm font-semibold text-zinc-900 hover:bg-zinc-100'>
              Go to Workspace Dashboard
              <ArrowRightIcon className='size-4' />
            </Button>
          </main>
        </div>
      </section>
    )
  }
}
