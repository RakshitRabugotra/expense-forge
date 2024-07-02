// Custom Actions
import { getUserPersonalizations } from '@/actions/user-personalization'

import * as Accordion from '@/components/Accordion'

// Type definitions
import { User } from '@supabase/supabase-js'
import { SubmitMonthlyLimitChange } from './SubmitPreferenceChange'

export default async function ModifyPreferences({ user }: { user: User }) {
  // Fetch the user preferences
  const personalizations = await getUserPersonalizations()

  if (!personalizations) {
    // Something went wrong
    return <div>Something went wrong with the server</div>
  }

  return (
    <Accordion.Root
      type='single'
      collapsible
      className='flex flex-1 flex-col items-center gap-3 [&>*]:w-full'
    >
      <MonthlyLimit defaultValue={personalizations.monthly_limit} />
      <Categories />
    </Accordion.Root>
  )
}

function MonthlyLimit({ defaultValue }: { defaultValue: number }) {
  return (
    <Accordion.Item value='set-monthly-limit'>
      <Accordion.Trigger title='Monthly Limit' />
      <Accordion.Content className=''>
        <form className='my-3 p-3'>
          <input
            id='monthly_limit'
            name='monthly_limit'
            type='number'
            defaultValue={defaultValue}
            aria-label='Set monthly limit'
            className='border-b-4 border-leaf-400 bg-transparent px-2 focus:outline-leaf-300'
          />
          <SubmitMonthlyLimitChange className='mx-2 w-[20%] rounded-md border-2 font-medium backdrop-blur-sm' />
        </form>
      </Accordion.Content>
    </Accordion.Item>
  )
}

function Categories() {
  return (
    <Accordion.Item value='user-categories'>
      <Accordion.Trigger title='Categories' />
      <Accordion.Content>
        <div className='my-3 p-3'>Coming Soon</div>
      </Accordion.Content>
    </Accordion.Item>
  )
}
