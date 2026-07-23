namespace backend.Models;
using System.ComponentModel.DataAnnotations;

public class Task
{

    public int Id { get; set; }

    [Required]
    [RegularExpression(@".*\S.*", ErrorMessage = "Title cannot be empty or whitespace.")]
    public required string Title { get; set; } = string.Empty;

    [Required]
    [RegularExpression("^(todo|in-progress|completed|blocked)$",
        ErrorMessage = "Status must be todo, in-progress, completed, or blocked.")]
    public string Status { get; set; } = string.Empty;


    [MaxLength(100, ErrorMessage = "Notes cannot exceed 100 characters.")]
    public string Notes { get; set; } = string.Empty;

    [Range(1, 4, ErrorMessage = "Priority must be between 1 and 4.")]
    public int Priority { get; set; } = 2;

}