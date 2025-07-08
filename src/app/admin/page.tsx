
'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePersonalData, PortfolioData } from '@/context/PersonalDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { socialIconMap } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Schemas for validation
const socialSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Must be a valid URL"),
});

const personalDataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  professionalSummary: z.string().min(1, 'Professional summary is required'),
  personalTouch: z.string().optional(),
  uniqueSellingPoint: z.string().optional(),
  contact: z.object({
    email: z.string().email('Invalid email address'),
    location: z.string().min(1, 'Location is required'),
  }),
  socials: z.array(socialSchema),
});

const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  role: z.string().min(1, 'Role is required'),
  problem: z.string().min(1, 'Problem is required'),
  technologies: z.string().min(1, 'At least one technology is required'),
  imageUrl: z.string().min(1, 'Image is required'),
  imageHint: z.string().optional(),
  liveUrl: z.string().url().or(z.literal('')).optional(),
  githubUrl: z.string().url().or(z.literal('')).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

// Generic Manager Component
function CrudManager<T extends { id: string, title: string }>({
  items,
  onUpdate,
  FormComponent,
  itemName,
}: {
  items: T[],
  onUpdate: (items: T[]) => void,
  FormComponent: React.FC<{ item: T | null, onSave: (item: T) => void, onOpenChange: (open: boolean) => void }>,
  itemName: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const handleAddNew = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (itemId: string) => {
    if (confirm(`Are you sure you want to delete this ${itemName}?`)) {
      onUpdate(items.filter(item => item.id !== itemId));
    }
  };

  const handleSave = (itemData: T) => {
    let newItems;
    if (itemData.id && items.find(i => i.id === itemData.id)) {
      newItems = items.map(item => item.id === itemData.id ? itemData : item);
    } else {
      newItems = [...items, { ...itemData, id: crypto.randomUUID() }];
    }
    onUpdate(newItems);
    setIsDialogOpen(false);
  };
  
  return (
    <CardContent>
      <Button onClick={handleAddNew} className="mb-4">
        <PlusCircle className="mr-2 h-4 w-4" /> Add New {itemName}
      </Button>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
            <span className="font-medium">{item.title}</span>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <FormComponent item={editingItem} onSave={handleSave} onOpenChange={setIsDialogOpen} />
      </Dialog>
    </CardContent>
  );
}


function PersonalDetailsForm() {
    const { personalData, setPersonalData } = usePersonalData();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof personalDataSchema>>({
        resolver: zodResolver(personalDataSchema),
        defaultValues: personalData.details,
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "socials",
    });

    useEffect(() => {
        form.reset(personalData.details);
    }, [personalData, form]);

    const onSubmit = (data: z.infer<typeof personalDataSchema>) => {
        setPersonalData({ ...personalData, details: data });
        toast({
            title: 'Success!',
            description: 'Your personal details have been updated.',
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title / Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="professionalSummary" render={({ field }) => (<FormItem><FormLabel>Professional Summary</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="personalTouch" render={({ field }) => (<FormItem><FormLabel>Personal Touch</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="uniqueSellingPoint" render={({ field }) => (<FormItem><FormLabel>Unique Selling Point</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="contact.email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="contact.location" render={({ field }) => (<FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />

                <div>
                    <Label className="text-lg font-semibold">Social Links</Label>
                    <div className="space-y-4 mt-2">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-end gap-2 p-3 border rounded-lg">
                                <FormField control={form.control} name={`socials.${index}.name`} render={({ field }) => (
                                    <FormItem className="flex-1"><FormLabel>Platform</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                        <SelectContent>{Object.keys(socialIconMap).map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name={`socials.${index}.url`} render={({ field }) => (<FormItem className="flex-1"><FormLabel>URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        ))}
                         <Button type="button" variant="outline" size="sm" onClick={() => append({ id: crypto.randomUUID(), name: 'GitHub', url: '' })}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Social
                        </Button>
                    </div>
                </div>

                <CardFooter className="px-0 pt-6">
                    <Button type="submit">Save Personal Details</Button>
                </CardFooter>
            </form>
        </Form>
    );
}

function ProjectForm({ item, onSave, onOpenChange }: { item: ProjectFormValues | null, onSave: (data: ProjectFormValues) => void, onOpenChange: (open: boolean) => void }) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: item ? { ...item, technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : '' } : { id: '', title: '', role: '', problem: '', technologies: '', imageUrl: '', liveUrl: '#', githubUrl: '#' },
  });

  useEffect(() => {
    form.reset(item ? { ...item, technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : '' } : { id: '', title: '', role: '', problem: '', technologies: '', imageUrl: '', liveUrl: '#', githubUrl: '#' });
  }, [item, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProjectFormValues) => {
    onSave(data);
  };
  
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader><DialogTitle>{item ? 'Edit' : 'Add'} Project</DialogTitle></DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="title" render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="role" render={({ field }) => <FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="problem" render={({ field }) => <FormItem><FormLabel>Problem</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="technologies" render={({ field }) => <FormItem><FormLabel>Technologies (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="liveUrl" render={({ field }) => <FormItem><FormLabel>Live URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="githubUrl" render={({ field }) => <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl><Input type="file" accept="image/*" onChange={handleFileChange} /></FormControl>
            <FormMessage />
            {form.watch('imageUrl') && <img src={form.watch('imageUrl')} alt="Preview" className="mt-2 rounded-md max-h-40" />}
          </FormItem>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

export default function AdminPage() {
    const { personalData, setPersonalData } = usePersonalData();

    const handleUpdateSection = (section: keyof Omit<PortfolioData, 'details' | 'skills'>) => (data: any[]) => {
        setPersonalData({ ...personalData, [section]: data });
    };

    const handleProjectUpdate = (projects: any[]) => {
        const processedProjects = projects.map(p => ({
            ...p,
            technologies: typeof p.technologies === 'string' ? p.technologies.split(',').map(t => t.trim()) : p.technologies
        }))
        setPersonalData({ ...personalData, projects: processedProjects });
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <Button variant="ghost" asChild className="mb-8"><Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to Portfolio</Link></Button>
            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <Card><CardHeader><CardTitle>Personal Details</CardTitle><CardDescription>Update your personal and contact information.</CardDescription></CardHeader><CardContent><PersonalDetailsForm /></CardContent></Card>
                </TabsContent>
                <TabsContent value="projects">
                     <Card><CardHeader><CardTitle>Projects</CardTitle><CardDescription>Manage your project entries.</CardDescription></CardHeader>
                        <CrudManager items={personalData.projects} onUpdate={handleProjectUpdate} FormComponent={ProjectForm as any} itemName="Project" />
                    </Card>
                </TabsContent>
                {/* Other tabs will be added here */}

            </Tabs>
        </div>
    );
}

