import { Tables } from '@/types/supabase'
import { currencyFormatter } from '@/utils/functions'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

export default function ExpenseItem({
  name,
  category,
  expenditure,
  IconComponent,
}: Tables<'expenses'> & { IconComponent: IconType }) {
  // Extract the different components of the expenditure
  const formattedExp = currencyFormatter.format(expenditure)
  const currencySymbol = formattedExp.charAt(0)
  const integerComponent = formattedExp.slice(1, -3)
  const decimalComponent = formattedExp.slice(-3)

  return (
    <div
      className={twMerge(
        'inline-flex w-full items-center justify-between',
        'rounded-lg border',
        'cursor-pointer select-none',
      )}
    >
      {/* Show the icon dynamically */}
      <IconComponent className='w-[20%] rounded-lg p-2 text-5xl' />

      <div className='w-[60%]'>
        {name && <h4 className='text-3xl'>{name}</h4>}
        {category && (
          <div className='text-xs font-medium capitalize leading-6'>
            {category}
          </div>
        )}
      </div>

      <div className='flex w-[20%] items-center justify-center text-5xl'>
        {expenditure && (
          <>
            <p className='text-base'>{currencySymbol}</p>
            <p className='text-2xl'>{integerComponent}</p>
            <p className='relative -bottom-[0.2em] text-xs'>
              {decimalComponent}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
