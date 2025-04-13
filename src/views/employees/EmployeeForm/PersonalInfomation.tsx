import { useMemo } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import { countryList } from '@/constants/countries.constant'
import { Controller } from 'react-hook-form'
import { components } from 'react-select'
import type { FormSectionBaseProps } from './types'
import type { ControlProps, OptionProps } from 'react-select'
import dayjs from 'dayjs'
import { DatePicker } from 'antd'
import useTranslation from '@/utils/hooks/useTranslation'

type OverviewSectionProps = FormSectionBaseProps

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

const { Control } = components

const genderOptions = [
    { value: 'MALE', label: 'MALE' },
    { value: 'FEMALE', label: 'FEMALE' },
]

const CivilStatusOptions = [
    { value: 'SINGLE', label: 'SINGLE' },
    { value: 'MARRIED', label: 'MARRIED' },
    { value: 'ANNULLED', label: 'ANNULLED' },
    { value: 'WINDOWED', label: 'WINDOWED' },
    { value: 'LEGALLY SEPARATED', label: 'LEGALLY SEPARATED' },
]

const CustomSelectOption = (props: OptionProps<CountryOption>) => {
    return (
        <DefaultOption<CountryOption>
            {...props}
            customLabel={(data) => (
                <span className="flex items-center gap-2">
                    <Avatar
                        shape="circle"
                        size={20}
                        src={`/img/countries/${data.value}.png`}
                    />
                    <span>{data.dialCode}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }: ControlProps<CountryOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src={`/img/countries/${selected.value}.png`}
                />
            )}
            {children}
        </Control>
    )
}

const OverviewSection = ({ control, errors }: OverviewSectionProps) => {
    const { t } = useTranslation()

    const dialCodeList = useMemo(() => {
        const newCountryList: Array<CountryOption> = JSON.parse(
            JSON.stringify(countryList),
        )

        return newCountryList.map((country) => {
            country.label = country.dialCode
            return country
        })
    }, [])

    return (
        <Card>
            <h4 className="mb-6">
                {t(
                    'page.employee.personal_information',
                    'Personal Information',
                )}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label={t('page.employee.first_name', 'First Name')}
                    invalid={Boolean(errors.firstName)}
                    errorMessage={errors.firstName?.message}
                >
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder={t(
                                    'page.employee.first_name',
                                    'First Name',
                                )}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label={t('page.employee.last_name', 'Last Name')}
                    invalid={Boolean(errors.lastName)}
                    errorMessage={errors.lastName?.message}
                >
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder={t(
                                    'page.employee.last_name',
                                    'Last Name',
                                )}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label={t('page.employee.gender', 'Gender')}
                    invalid={Boolean(errors.gender)}
                    errorMessage={errors.gender?.message}
                >
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select
                                className="mb-4"
                                placeholder={t(
                                    'page.select_placeholder',
                                    'Please Select',
                                )}
                                options={genderOptions}
                                value={genderOptions.find(
                                    (option) => option.value === field.value,
                                )}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label={t('page.employee.civil_status', 'Civil Status')}
                    invalid={Boolean(errors.civilStatus)}
                    errorMessage={errors.civilStatus?.message}
                >
                    <Controller
                        name="civilStatus"
                        control={control}
                        render={({ field }) => (
                            <Select
                                className="mb-4"
                                placeholder={t(
                                    'page.select_placeholder',
                                    'Please Select',
                                )}
                                options={CivilStatusOptions}
                                value={CivilStatusOptions.find(
                                    (option) => option.value === field.value,
                                )}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label={t('page.employee.height', 'Height')}
                    invalid={Boolean(errors.height)}
                    errorMessage={errors.height?.message}
                >
                    <Controller
                        name="height"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                autoComplete="off"
                                placeholder={t(
                                    'page.employee.height',
                                    'Height',
                                )}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label={t('page.employee.weight', 'Weight')}
                    invalid={Boolean(errors.weight)}
                    errorMessage={errors.weight?.message}
                >
                    <Controller
                        name="weight"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                autoComplete="off"
                                placeholder={t(
                                    'page.employee.weight',
                                    'Weight',
                                )}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label={t('page.employee.email', 'Email')}
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                autoComplete="off"
                                placeholder={t('page.employee.email', 'Email')}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>

                <div className="flex items-end gap-4 w-full">
                    <FormItem
                        invalid={
                            Boolean(errors.phoneNumber) ||
                            Boolean(errors.dialCode)
                        }
                    >
                        <label className="form-label mb-2">
                            {t('page.employee.phone_number', 'Phone Number')}
                        </label>
                        <Controller
                            name="dialCode"
                            control={control}
                            render={({ field }) => (
                                <Select<CountryOption>
                                    options={dialCodeList}
                                    {...field}
                                    className="w-[150px]"
                                    components={{
                                        Option: CustomSelectOption,
                                        Control: CustomControl,
                                    }}
                                    placeholder=""
                                    value={dialCodeList.filter(
                                        (option) =>
                                            option.dialCode === field.value,
                                    )}
                                    onChange={(option) =>
                                        field.onChange(option?.dialCode)
                                    }
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        className="w-full"
                        invalid={
                            Boolean(errors.phoneNumber) ||
                            Boolean(errors.dialCode)
                        }
                        errorMessage={errors.phoneNumber?.message}
                    >
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <NumericInput
                                    autoComplete="off"
                                    placeholder={t(
                                        'page.employee.phone_number',
                                        'Phone Number',
                                    )}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </FormItem>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label={t('page.employee.age', 'Age')}
                    invalid={Boolean(errors.age)}
                    errorMessage={errors.age?.message}
                >
                    <Controller
                        name="age"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                autoComplete="off"
                                placeholder={t('page.employee.age', 'Age')}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label={t('page.employee.birthday', 'Birthday')}
                    invalid={Boolean(errors.birthday)}
                    errorMessage={errors.birthday?.message}
                >
                    <Controller
                        name="birthday"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                placeholder={t('page.date_placeholder', 'Date')}
                                className="w-full"
                                style={{ height: '48px', borderRadius: '12px' }}
                                value={
                                    field.value
                                        ? dayjs(field.value, 'YYYY-MM-DD')
                                        : null
                                }
                                onChange={(date) => {
                                    field.onChange(date.format('YYYY-MM-DD'))
                                }}
                            />
                        )}
                    />
                </FormItem>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label={t('page.employee.national_id', 'National ID')}
                    invalid={Boolean(errors.nationalId)}
                    errorMessage={errors.nationalId?.message}
                >
                    <Controller
                        name="nationalId"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder={t(
                                    'page.employee.national_id_placeholder',
                                    'City, Province, Country',
                                )}
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label={t(
                        'page.employee.place_of_birthday',
                        'Place of Birth',
                    )}
                    invalid={Boolean(errors.placeOfBirth)}
                    errorMessage={errors.placeOfBirth?.message}
                >
                    <Controller
                        name="placeOfBirth"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder={t(
                                    'page.employee.place_of_birthday_placeholder',
                                    'House/Unit Number, Building, Street, City, Province, Country',
                                )}
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>

            <FormItem
                label={t('page.employee.address', 'Address')}
                invalid={Boolean(errors.address)}
                errorMessage={errors.address?.message}
            >
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder={t('page.employee.address', 'Address')}
                            {...field}
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default OverviewSection
