import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-class-details',
  templateUrl: './add-class-details.component.html',
  styleUrls: ['./add-class-details.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AddClassDetailsComponent {
  isFileModalOpen = false;
  isVideoLinkModalOpen = false;
  isMeetLinkModalOpen = false;

  newFile: File | null = null;
  newVideoLink: string = '';
  newMeetLink: string = '';

  groupDetails: any[] = [];  // Use groupDetails instead of classDetails

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchGroupDetails();
  }

  fetchGroupDetails() {
    this.http.get<any>('https://api.classwix.com/api/groups').subscribe(
      (data) => {
        console.log('Group details:', data);
        this.groupDetails = data.groups;  // Accessing 'groups' from the response object
      },
      (error) => {
        // Handle errors
        console.error('Error fetching group details:', error);
      }
    );
  }
  


  openFileModal() {
    this.isFileModalOpen = true;
  }

  openVideoLinkModal() {
    this.isVideoLinkModalOpen = true;
  }

  openMeetLinkModal() {
    this.isMeetLinkModalOpen = true;
  }

  closeFileModal() {
    this.isFileModalOpen = false;
  }

  closeVideoLinkModal() {
    this.isVideoLinkModalOpen = false;
  }

  closeMeetLinkModal() {
    this.isMeetLinkModalOpen = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.newFile = input.files[0];
    }
  }

  submitFile() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const formData = new FormData();
      if (this.newFile) {
        formData.append('file', this.newFile);
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,  
        });
        this.http.post('https://api.classwix.com/api/uploadFile', formData, { headers }).subscribe(
          (response) => {
            console.log('File uploaded successfully:', response);
          },
          (error) => {
            console.error('Error uploading file:', error);
          }
        );
      }
      this.closeFileModal();
    } else {
      console.error('No token found in localStorage');
    }
  }
  
  submitVideoLink() {
    // Add video link submission logic
    this.http.post('https://api.classwix.com/api/addVideoLink', { videoLink: this.newVideoLink }).subscribe();
    this.closeVideoLinkModal();
  }

  submitMeetLink() {
    // Add meet link submission logic
    this.http.post('https://api.classwix.com/api/addMeetLink', { meetLink: this.newMeetLink }).subscribe();
    this.closeMeetLinkModal();
  }
}
