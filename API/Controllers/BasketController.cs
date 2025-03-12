using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context): BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();
            if(basket ==null) return NoContent();

           return basket.ToDto();
    }
    [HttpPost]
    public async Task<ActionResult<BasketDto>>AddItemtoBasket(int productId, int quantity)
    {
        //get basket
        var basket = await RetrieveBasket();
         // create basket
        basket ??= CreateBasket();
         // get product
         var product = await context.Products.FindAsync(productId);
         if (product ==null) return BadRequest("Problem adding item to basket");
        // add item to basket
        basket.AddItem(product,quantity);
          // save changes
        var result = await context.SaveChangesAsync()>0; 
        if(result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());
          return BadRequest("Problem updating basket");

    }

  

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        //get basket
        var basket = await RetrieveBasket();
        if(basket == null) return BadRequest("Unable to retrive the basket");
        // remove the item or reduce the quantity
        
        basket.RemoveItem(productId,quantity);
            // save changes
        var result = await context.SaveChangesAsync()>0;
    
        if(result) return Ok();
        return BadRequest("Problem updating basket");
    }


  private Basket CreateBasket()
    {
        var basketID= Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true, 
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("basketID", basketID, cookieOptions);
        var basket = new Basket {BasketID = basketID};
        context.Baskets.Add(basket);
        return basket;
    }
     private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
                 .Include(x =>x.Items)
            .ThenInclude(x =>x.Product)
            .FirstOrDefaultAsync(x => x.BasketID == Request.Cookies["basketID"]);
    }

}