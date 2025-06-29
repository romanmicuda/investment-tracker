package com.personal.finance.tracker.demo.category.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personal.finance.tracker.demo.appUser.data.AppUser;
import com.personal.finance.tracker.demo.appUser.logic.UserProviderService;
import com.personal.finance.tracker.demo.category.data.Category;
import com.personal.finance.tracker.demo.category.logic.CategoryService;
import com.personal.finance.tracker.demo.category.web.bodies.CategoryResponse;
import com.personal.finance.tracker.demo.category.web.bodies.CreateCategoryRequest;
import com.personal.finance.tracker.demo.exception.NotFoundException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;
    private final UserProviderService userProviderService;

    public CategoryController(CategoryService categoryService, UserProviderService userProviderService) {
        this.categoryService = categoryService;
        this.userProviderService = userProviderService;
    }
    
    @GetMapping("{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable UUID id) throws NotFoundException {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() throws NotFoundException {
        AppUser appUser = userProviderService.getCurrentUser().orElseThrow(() -> new NotFoundException("User not found"));
        return ResponseEntity.ok(categoryService.getAllCategories(appUser).stream()
                .map(CategoryResponse::new)
            .collect((Collectors.toList())));
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CreateCategoryRequest request) throws NotFoundException {
        AppUser appUser = userProviderService.getCurrentUser().orElseThrow(() -> new NotFoundException("User not found"));

        Category savedCategory = categoryService.saveCategory(request.getCategory(), appUser);
        return ResponseEntity.ok(savedCategory);
    }
    
}
