---
external: false
author: "Utkarsh Maheshwari"
draft: false
publishDate: "2021-05-14 21:21:53"
title: "Simplest Memory Allocator in an OS"
snippet: "Memory management is one of the, if not most, important parts of an OS. To begin small, we'll choose the First Fit algorithm which is the easiest to implement."
image:
  src: "https://images.unsplash.com/photo-1526392269816-39d8ed656494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDN8fHJhbSUyMGFsbG9jfGVufDB8fHx8MTYyMTAyMTI1OQ&ixlib=rb-1.2.1&q=80&w=2000"
  alt: "Simplest Memory Allocator in an OS"
tags: ["OSDev"]
category: ""
---


Memory management is one of the, if not most, important parts of an OS. It needs to efficiently allocate and deallocate chunks of memory and it needs to do it now. The things to keep in mind when writing a memory allocator is to minimise the time taken to allocate or deallocate a memory block and at the same time, minimise fragmentation that may (will!) be caused after multiple cycles of allocations and deallocations.

> For those who don't know, [Jazz](http://github.com/coditva/Jazz) is a toy OS that I'm writing and it is in need of a memory allocator for some time now.

There are multiple open source pluggable memory allocators which are available but I wanted to write one myself. I have been able to enable paging for it, which I'm not very confident of right now, but I'm willing to move on and write a memory allocator anyway. I'll come back and fix anything if worse comes to worst.

* * *

There are multiple algorithms to choose from for the memory allocation, but to begin small, we'll choose the **First Fit** algorithm which is the easiest to implement using a linked list. We'll use a doubly linked list because it makes removing a node easier.

Admittedly, it's not the best algorithm to implement but it gets the job done and we can easily swap out this for something more sophisticated like _Buddy Allocation_ later if we keep our interface clean.

The pseudocode
==============

The algorithm is fairly simple:

1.  Keep a linked list of free blocks.
2.  Find the first block that can fit the requested size
3.  From this block, allocate the requested memory and return the remaining memory back to the linked list.

Prerequisite: Page Allocator
============================

The memory allocator depends on a page allocator to be available. A page allocator should allocate a page of a fixed size which the memory allocator will break into smaller chunks.

```c
// page_alloc.h

typedef struct page_t {
    // ...
    void *address;
};

// allocates a new page
page_t * page_alloc ();

// frees the given page
void * page_free (page_t page);
```

The implementation
==================

The interface
-------------

We keep the interface similar to the unix system calls:

```c
// mem_alloc.h

// allocate the given number of bytes
void * malloc (size_t bytes);

// free the block previously allocated
void free (void *block);
```


The `malloc` returns a block for the given size. `free` frees the block.

The linked list of free blocks
------------------------------

To keep a list of free memory, we need to create a linked list. This can easily be done by using the block itself as a node in the list. Allocating a new block is as simple as:

```c
// mem_alloc.c

// a node in the list of free blocks
typedef struct free_block_t {
    free_block_t *next; // the next block
    free_block_t *prev; // the previous block
    size_t       size;  // the size of the block
} free_block_t;

// the head node in the list of free blocks
static free_block_t * free_mem_list = NULL;

// allocates a new block from a new page
static free_block_t * allocate_new_block ()
{
    page_t *page = page_alloc();
    free_block_t * block = page->address;

    block->size = PAGE_SIZE;
    block->next = NULL;
    block->prev = NULL;

    return block;
}
```


First Fit allocator
-------------------

To find a block in the free blocks list, we create a helper function like so:

```c
// mem_alloc.c

// find the first block that can fit the given size
void * find_first_fit_block (size_t bytes)
{
    // if we don't have any blocks, allocate a new page
    if (free_mem_list == NULL) {
            free_mem_list = allocate_new_block();

        // it is the only block in the list, return it.
        return free_mem_list;
    }

    block_t *block = free_mem_list;
    int found = 0;

    while (1) {
        if (block->size >= size) {
            found = 1;
            break;
        }

        // ensure that reference to block is always valid
        if (block->next == NULL) {
            break;
        }

        block = block->next;
    }

    if (!found) {
        // this block would always be the last block in the list.
        // just update the `next` for it
        block->next       = allocate_new_block();
        block->next->prev = block;

        // set the new block as the current block
        block = block->next;
    }

    // either we found a bigger block or we created a new block.
    // in either case, this block is the first fit
    return block;
}
```


The interface methods
---------------------

Up till now, we've created a list of free blocks, and a way to find the first free block which can fit the given size. Next, we need to implement `malloc` and `free`.

You would have noticed that `free` does not take the size of the block. **How do we know the size of the block when we want to free it?**

### This can be solved in two ways:

1.  Store a separate list of allocated blocks and map the size of the block to its address. This is not ideal because it adds the complexity of separate book-keeping for the block.
2.  A better approach is to **keep this metadata in the block itself but hidden from the consumer.** This approach is good if we trust the consumer to not mess up this hidden metadata (which we do because we're in kernel space).

**Going with the second approach**, we keep a small amount of data in the block just before the address that we return. To do this, we allocate a block of (requested size + metadata size). The metadata can store the information about the block size.

Now, when `free` is called with this block, it can check the metadata just before the address of the block to find the size and return the block back to the free memory list.

It's fairly straight-forward to implement these methods, so I'm leaving this up to you to try out if you want. If not, check out the [implementation in Jazz](https://github.com/coditva/Jazz/blob/7a80202f460a3eb1d6c07c756e8341559189f19b/kernel/mm/memory_alloc.c).

* * *

This was the simplest algorithm that you can use to implement a memory allocator. But this algorithm lacks a few things like:

1.  merging multiple free blocks
2.  faster allocation of blocks (currently it works in `O(n)` time).

There are better algorithms to handle these shortcomings like **buddy allocation**. It has shortcomings of its own, but even then it performs better than first fit. This is left as an improvement for now.
