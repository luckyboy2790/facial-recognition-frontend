import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import { Ref } from 'react'
import useTranslation from '@/utils/hooks/useTranslation'

type LeaveTypeListSearchProps = {
    onInputChange: (value: string) => void
    ref?: Ref<HTMLInputElement>
}

const LeaveTypeListSearch = (props: LeaveTypeListSearchProps) => {
    const { onInputChange, ref } = props

    const { t } = useTranslation()

    return (
        <DebouceInput
            ref={ref}
            placeholder={t('page.leave_type.quick_search', 'Quick search...')}
            suffix={<TbSearch className="text-lg" />}
            onChange={(e) => onInputChange(e.target.value)}
        />
    )
}

export default LeaveTypeListSearch
