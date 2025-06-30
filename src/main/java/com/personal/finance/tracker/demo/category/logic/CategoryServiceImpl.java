package com.personal.finance.tracker.demo.category.logic;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.personal.finance.tracker.demo.appUser.data.AppUser;
import com.personal.finance.tracker.demo.category.data.Category;
import com.personal.finance.tracker.demo.category.data.CategoryRepository;
import com.personal.finance.tracker.demo.exception.NotFoundException;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category getCategoryById(UUID id) throws NotFoundException {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found with id: " + id));
    }

    @Override
    public List<Category> getAllCategories(AppUser appUser) {
        return categoryRepository.findAllByUser(appUser);
    }

    @Override
    public Category saveCategory(String categoryName, AppUser appUser) {
        Category category = new Category();
        category.setName(categoryName);
        category.setUser(appUser);
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategoryByName(String name, AppUser appUser) throws NotFoundException {
        Category category = categoryRepository.findByNameAndUser(name, appUser);
        if (category == null) {
            throw new NotFoundException("Category not found with name: " + name);
        }
        return category;
    }

    @Override
    public void deleteCategory(UUID id, AppUser appUser) throws NotFoundException {
        Category category = getCategoryById(id);
        if (!category.getUser().equals(appUser)) {
            throw new NotFoundException("Category not found with id: " + id + " for user: " + appUser.getUsername());
        }
        category.setDeletable(true);
        categoryRepository.save(category);
    }
    
}
