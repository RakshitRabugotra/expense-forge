import { twMerge } from 'tailwind-merge'

// Custom Utilities
import {
  compressToUnits,
  currencyFormatterINR,
} from '@/utils/functions/currency'

// Type definitions
import type { Tables } from '@/types/supabase'
import type { IconType } from 'react-icons'

// Icon Dependencies
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { HTMLElementProps } from '@/types/page-component'

// Decide the icon based on category
const IconComponent: IconType = (props) => (
  <RiMoneyDollarCircleFill {...props} />
)

export default function ExpenseItem({
  id,
  className,
  onClick,
  name,
  category,
  expenditure,
}: Tables<'expenses'> &
  HTMLElementProps & {
    onClick?: React.MouseEventHandler<HTMLDivElement>
  }) {
  // Extract the different components of the expenditure
  const formattedExp = compressToUnits(expenditure, currencyFormatterINR)

  return (
    <div
      id={id}
      onClick={onClick}
      className={twMerge(
        'inline-flex w-full items-center justify-between',
        'rounded-lg border shadow-sm',
        'select-none',
        'shadow-sm backdrop-blur-md',
        onClick ? 'cursor-pointer' : '',
        className,
      )}
    >
      {/* Show the icon dynamically */}
      <IconComponent className='w-[20%] rounded-lg p-2 text-5xl' />

      <div className='w-[60%]'>
        {name && <h4 className='text-wrap text-xl capitalize'>{name}</h4>}
        {category && (
          <div className='text-wrap text-xs font-medium leading-6 text-inactive'>
            {category}
          </div>
        )}
      </div>

      <div className='flex w-[20%] flex-col items-center justify-center text-5xl'>
        {expenditure && (
          <>
            <p className='max-w-full text-wrap break-words text-center text-base'>
              {formattedExp}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
