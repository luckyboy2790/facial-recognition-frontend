import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import { Ref } from 'react'
import useTranslation from '@/utils/hooks/useTranslation'

type LeaveListSearchProps = {
    onInputChange: (value: string) => void
    ref?: Ref<HTMLInputElement>
}

const LeaveListSearch = (props: LeaveListSearchProps) => {
    const { onInputChange, ref } = props

    const { t } = useTranslation()

    return (
        <DebouceInput
            ref={ref}
            placeholder={t('page.quick_search', 'Quick search...')}
            suffix={<TbSearch className="text-lg" />}
            onChange={(e) => onInputChange(e.target.value)}
        />
    )
}

export default LeaveListSearch
