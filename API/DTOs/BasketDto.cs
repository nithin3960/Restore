using System;

namespace API.DTOs;

public class BasketDto
{

    public required string BasketID {get; set;}

    public List<BasketItemDto> Items{get; set;}=[];


}
