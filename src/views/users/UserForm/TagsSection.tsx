import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import { Controller } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import type { FormSectionBaseProps } from './types'

type TagsSectionProps = FormSectionBaseProps

const defaultOptions = [
    { value: 'frequentShoppers', label: 'Frequent Shoppers' },
    { value: 'inactiveCustomers', label: 'Inactive' },
    { value: 'newCustomers', label: 'New' },
]

const TagsSection = ({ control }: TagsSectionProps) => {
    return (
        <Card>
            <h4 className="mb-2">Customer Tags</h4>
            <div className="mt-6">
                <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <Select
                            isMulti
                            isClearable
                            placeholder="Add tags for customer..."
                            componentAs={CreatableSelect}
                            options={defaultOptions}
                            onChange={(option) => field.onChange(option)}
                        />
                    )}
                />
            </div>
        </Card>
    )
}

export default TagsSection
