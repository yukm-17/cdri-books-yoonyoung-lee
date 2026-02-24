interface ItemPriceProps {
	price: number
	salePrice: number
	size?: 'sm' | 'md'
}

const ItemPrice = ({ price, salePrice, size = 'md' }: ItemPriceProps) => {
	return size === 'md' ? (
		salePrice > 0 ? (
			<div className="flex flex-col gap-2 items-end">
				<div className="flex gap-2 items-center">
					<span className="text-sm text-zinc-500">원가</span>

					<h4 className="text-2xl break-keep leading-5 line-through">{price.toLocaleString()}원</h4>
				</div>

				<div className="flex gap-2 items-center">
					<span className="text-sm text-zinc-500">할인가</span>

					<h4 className="text-2xl font-bold break-keep leading-5">
						{salePrice.toLocaleString()}원
					</h4>
				</div>
			</div>
		) : (
			<h4 className="text-2xl font-bold break-keep leading-5">{price.toLocaleString()}원</h4>
		)
	) : (
		<h4 className="text-xl font-bold break-keep leading-5">
			{salePrice > 0 ? salePrice.toLocaleString() : price.toLocaleString()}원
		</h4>
	)
}

export default ItemPrice
