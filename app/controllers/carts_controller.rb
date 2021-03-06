class CartsController < ApplicationController
  def show
    @order_items = current_order.order_items
    @promos = Promo.all
  end

  def apply_promo
    # Set Error States
    @promo_error = ''
    @promo_error_state = 0

    # Get Cart Order Items
    @order = current_order
    @order_items = current_order.order_items

    # Get the promo code entered
    @promo = Promo.find_by promo_code: params[:promo_code]

    # Determine the cheapest pair
    @order_min = @order_items.min_by {|item| item.unit_price }
    @order_min_price = @order_min.unit_price

    @order_item = @order.order_items.find(@order_min.id)

    # Determine if code is valid
    if @promo
      @enteredCode = @promo.promo_code
      # Check to see if it is within the start/end dates
      if Date.today >= @promo.start_date && Date.today <= @promo.end_date
        @promo_error = ''
        @promo_error_state = 0
      else
        @promo_error = 'Expired code'
        @promo_error_state = 1
      end
      # Check to see if the code has been redeemed yet
      if @promo.redeemed
        @promo_error = 'Code already redeemed'
        @promo_error_state = 1
      end
    else
      @enteredCode = params[:promo_code]
      @promo_error = "Code doesn't exist"
      @promo_error_state = 1
    end
    if @promo_error_state == 0
      @promo_error = "Success!"
      # Set session
      session[:promo_id] = @promo.id

      # Determine promo type
      @promo_type = @promo.promo_type_id

      case @promo_type
      # Promo Type 1: Free Pair - Free Shipping
      when @promo_type_id = 1
        # Determine the cheapest pair
        @order_min = @order_items.min_by {|item| item.unit_price }
        @order_min_price = @order_min.unit_price
        @order_item = @order.order_items.find(@order_min.id)
        # Deduct the cheapest pair
        @order_item.update_attributes(discount: @order_min_price)
        @order_items = @order.order_items
        # Deduct shipping cost
        @order.update_attributes(shipping_discount: 5)
        @order_shipping_discount = @order.shipping_discount
        @order_shipping = (@order.shipping != 0) ? @order.shipping - @order_shipping_discount : 0
      # Promo Type 2: SUOC Percentage Off Subtotal
      when @promo_type_id = 2
        percentOff = 0
        if @enteredCode == "CS16-20147"
          percentOff = 0.5
        else
          percentOff = 0.3
        end
        @order_items.each do |order_item|
          order_item.update_attributes(discount: order_item.unit_price * percentOff)
        end
        @order.update_attributes(shipping_discount: 0)
        @order_shipping_discount = @order.shipping_discount
        @order_shipping = (@order.shipping != 0) ? @order.shipping - @order_shipping_discount : 0
      # Promo Type 3: Site-wide Percentage Off Subtotal
      when @promo_type_id = 3
        percentOff = 0.25
        @order_items.each do |order_item|
          order_item.update_attributes(discount: order_item.unit_price * percentOff)
        end
        @order.update_attributes(shipping_discount: 0)
        @order_shipping_discount = @order.shipping_discount
        @order_shipping = (@order.shipping != 0) ? @order.shipping - @order_shipping_discount : 0
      else
        # do something, or nothing
      end
    end
  end
end
