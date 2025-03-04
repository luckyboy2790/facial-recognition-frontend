import { useState, useMemo } from 'react'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Tag from '@/components/ui/Tag'
import toast from '@/components/ui/toast'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import classNames from '@/utils/classNames'
import isLastChild from '@/utils/isLastChild'
import CreditCardDialog from '@/components/view/CreditCardDialog'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import { countryList } from '@/constants/countries.constant'
import dayjs from 'dayjs'

type OrderHistory = {
    id: string
    item: string
    status: string
    amount: number
    date: number
}

type PaymentMethod = {
    cardHolderName: string
    cardType: string
    expMonth: string
    expYear: string
    last4Number: string
    primary: boolean
}

type BillingSectionProps = {
    data: Partial<{
        orderHistory: OrderHistory[]
        personalInfo: {
            address: string
            postcode: string
            city: string
            country: string
        }
        paymentMethod: PaymentMethod[]
    }>
}

const { Tr, Td, TBody } = Table

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

const statusColor: Record<string, string> = {
    paid: 'bg-emerald-500',
    pending: 'bg-amber-400',
}

const columnHelper = createColumnHelper<OrderHistory>()

const columns = [
    columnHelper.accessor('item', {
        header: 'Product',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{row.item}</span>
                </div>
            )
        },
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center gap-2">
                    <Badge className={statusColor[row.status]} />
                    <span className="heading-text font-bold capitalize">
                        {row.status}
                    </span>
                </div>
            )
        },
    }),
    columnHelper.accessor('date', {
        header: 'Date',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {dayjs.unix(row.date).format('MM/DD/YYYY')}
                </div>
            )
        },
    }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <NumericFormat
                        displayType="text"
                        value={(Math.round(row.amount * 100) / 100).toFixed(2)}
                        prefix={'$'}
                        thousandSeparator={true}
                    />
                </div>
            )
        },
    }),
]

const initialSelectedCard = {
    cardHolderName: '',
    ccNumber: '',
    cardExpiry: '',
    code: '',
}

const BillingSection = ({ data }: BillingSectionProps) => {
    const [selectedCard, setSelectedCard] = useState<{
        cardHolderName: string
        ccNumber: string
        cardExpiry: string
        code: string
    }>(initialSelectedCard)

    const [dialogOpen, setDialogOpen] = useState(false)

    const table = useReactTable({
        data: data.orderHistory || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const countryName = useMemo(() => {
        return countryList.find(
            (country) => country.value === data.personalInfo?.country,
        )?.label
    }, [data.personalInfo?.country])

    const handleEdit = (cardHolderName: string, cardExpiry: string) => {
        setSelectedCard({
            ...initialSelectedCard,
            cardHolderName,
            cardExpiry,
        })
        setDialogOpen(true)
    }

    const handleEditClose = () => {
        setSelectedCard(initialSelectedCard)
        setDialogOpen(false)
    }

    const handleSubmit = () => {
        handleEditClose()
        toast.push(
            <Notification title={'Successfully updated!'} type="success" />,
            {
                placement: 'top-center',
            },
        )
    }

    return (
        <>
            <h6 className="mb-4">Purchase history</h6>
            <Table>
                <TBody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })}
                </TBody>
            </Table>
            <h6 className="mt-8">Addresses</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Card>
                    <div className="font-bold heading-text">
                        Billing Address
                    </div>
                    <div className="mt-4 flex flex-col gap-1 font-semibold">
                        <span>{data.personalInfo?.address}</span>
                        <span>{data.personalInfo?.city}</span>
                        <span>{data.personalInfo?.postcode}</span>
                        <span>{countryName}</span>
                    </div>
                </Card>
                <Card>
                    <div className="font-bold heading-text">
                        Delivery Address
                    </div>
                    <div className="mt-4 flex flex-col gap-1 font-semibold">
                        <span>{data.personalInfo?.address}</span>
                        <span>{data.personalInfo?.city}</span>
                        <span>{data.personalInfo?.postcode}</span>
                        <span>{countryName}</span>
                    </div>
                </Card>
            </div>
            <h6 className="mt-8">Payment Methods</h6>
            <Card className="mt-4" bodyClass="py-0">
                {data.paymentMethod?.map((card, index) => (
                    <div
                        key={card.last4Number}
                        className={classNames(
                            'flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4',
                            !isLastChild(data.paymentMethod || [], index) &&
                                'border-b border-gray-200 dark:border-gray-600',
                        )}
                    >
                        <div className="flex items-center gap-3">
                            {card.cardType === 'VISA' && (
                                <img src="/img/others/img-8.png" alt="visa" />
                            )}
                            {card.cardType === 'MASTER' && (
                                <img src="/img/others/img-9.png" alt="master" />
                            )}
                            <div>
                                <div className="flex items-center">
                                    <div className="text-gray-900 dark:text-gray-100 font-semibold">
                                        {card.cardHolderName} ••••{' '}
                                        {card.last4Number}
                                    </div>
                                    {card.primary && (
                                        <Tag className="bg-sky-100 text-primary dark:bg-primary/20 dark:text-primary rounded-md border-0 mx-2">
                                            <span className="capitalize">
                                                {' '}
                                                Primary{' '}
                                            </span>
                                        </Tag>
                                    )}
                                </div>
                                <span>
                                    Expired{' '}
                                    {months[parseInt(card.expMonth) - 1]} 20
                                    {card.expYear}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                size="sm"
                                onClick={() =>
                                    handleEdit(
                                        card.cardHolderName,
                                        `${card.expMonth}${card.expYear}`,
                                    )
                                }
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                ))}
                <CreditCardDialog
                    title="Edit credit card"
                    defaultValues={selectedCard}
                    dialogOpen={dialogOpen}
                    onDialogClose={handleEditClose}
                    onSubmit={handleSubmit}
                />
            </Card>
        </>
    )
}

export default BillingSection
